import {
  FilterCellConfig,
  FilterComparison,
  FilterItem,
  FilterValue,
  TableDataCell
} from '@models/base-data-list';

import { CELL_FILTER_COMPARISONS } from '../base-table-filter.const';
import { ValidDisplayValuePipe } from 'src/app/pipes/valid-display-value.pipe';

export class BaseTableFilterUtil {
  static getDefaultFilterConfigs(cell: TableDataCell) {
    const { filterConfigs }: TableDataCell = structuredClone(cell);
    const type = filterConfigs?.type || 'text';
    const comparison = getCellComparison(cell, type);

    return {
      ...filterConfigs,
      comparison,
      type,
      required: false
    };
    function getCellComparison(cell: TableDataCell, type: string): string {
      const customFilterComparison = cell?.filterConfigs?.customSelectionKey;
      if (customFilterComparison) {
        return customFilterComparison;
      }

      const isMulti = filterConfigs?.isMulti;
      const comparison =
        CELL_FILTER_COMPARISONS[type].at(0)?.value || FilterComparison.Equal;

      if (type === 'text') {
        return FilterComparison.Contains;
      }

      if (type === 'selection') {
        return isMulti ? FilterComparison.In : FilterComparison.ContainsAny;
      }

      return comparison;
    }
  }

  static getFilterItems(columns: Array<TableDataCell>): Array<FilterItem> {
    let resultFilterData: Array<FilterItem> = [];
    for (const cellItem of columns) {
      if (!cellItem.isFiltering) {
        const newCell = this.transformFilterCol(cellItem, false);
        cellItem.filterConfigs = structuredClone(newCell.filterConfigs);
        resultFilterData = [
          ...resultFilterData,
          ...this.getFilterItem(newCell)
        ];
        continue;
      }
      resultFilterData = [...resultFilterData, ...this.getFilterItem(cellItem)];
    }

    return resultFilterData;
  }

  static getFilterItem(cellItem: TableDataCell): Array<FilterItem> {
    const resultFilterData: Array<FilterItem> = [];
    const validFilterKey = cellItem.filterConfigs?.filterKey || cellItem.key;
    if (!validFilterKey) {
      return [];
    }

    const filterConfigs = cellItem.filterConfigs;
    const validNumberValue =
      new ValidDisplayValuePipe().transform(filterConfigs.fieldValue) !== '';
    const isInvalidSelectionValue =
      Array.isArray(filterConfigs.fieldValue) &&
      !filterConfigs.fieldValue.filter(
        (value) => !!new ValidDisplayValuePipe().transform(value)?.toString()
      ).length;

    if (
      !filterConfigs ||
      (!filterConfigs.fieldValue && !validNumberValue) ||
      isInvalidSelectionValue
    ) {
      return [];
    }

    if (filterConfigs.comparison === 'between') {
      if (filterConfigs.type === 'number') {
        if (filterConfigs.fieldValue['start']) {
          resultFilterData.push({
            fieldName: validFilterKey,
            comparison: FilterComparison.BiggerOrEqual,
            fieldValue: filterConfigs.fieldValue['start'].toString()
          });
        }
        if (filterConfigs.fieldValue['end']) {
          resultFilterData.push({
            fieldName: validFilterKey,
            comparison: FilterComparison.SmallerOrEqual,
            fieldValue: filterConfigs.fieldValue['end'].toString()
          });
        }
      }
      if (filterConfigs.type === 'date') {
        resultFilterData.push({
          fieldName: validFilterKey,
          comparison: FilterComparison.BiggerOrEqual,
          fieldValue: filterConfigs.fieldValue[0].toString()
        });
        resultFilterData.push({
          fieldName: validFilterKey,
          comparison: FilterComparison.SmallerOrEqual,
          fieldValue: filterConfigs.fieldValue[1].toString()
        });
      }

      return resultFilterData;
    }

    if (filterConfigs.type === 'range-date') {
      if (filterConfigs.comparison === 'inRange') {
        resultFilterData.push({
          fieldName: filterConfigs.startRangeKey,
          comparison: FilterComparison.SmallerOrEqual,
          fieldValue: filterConfigs.fieldValue.toString()
        });
        resultFilterData.push({
          fieldName: filterConfigs.endRangeKey,
          comparison: FilterComparison.BiggerOrEqual,
          fieldValue: filterConfigs.fieldValue.toString()
        });

        return resultFilterData;
      }

      resultFilterData.push({
        fieldName:
          filterConfigs.comparison === FilterComparison.Smaller
            ? filterConfigs.startRangeKey
            : filterConfigs.endRangeKey,
        comparison: filterConfigs.comparison,
        fieldValue: filterConfigs.fieldValue.toString()
      });

      return resultFilterData;
    }

    if (filterConfigs.type === 'selection') {
      resultFilterData.push(
        this.getSelectionFilterValue(validFilterKey, filterConfigs)
      );
      return resultFilterData;
    }

    const fieldValue = Array.isArray(filterConfigs.fieldValue)
      ? filterConfigs.fieldValue
          .filter(
            (value) => !!new ValidDisplayValuePipe().transform(value).toString()
          )
          .toString()
      : filterConfigs.fieldValue.toString();
    const filterItem: FilterItem = {
      fieldName: validFilterKey,
      comparison: filterConfigs.comparison || FilterComparison.Equal,
      fieldValue
    };

    resultFilterData.push(filterItem);

    return resultFilterData;
  }

  static transformFilterCols(
    data: Array<TableDataCell>,
    filterState: boolean,
    keepSortOrder: boolean = true
  ): Array<TableDataCell> {
    const cloneCells = structuredClone(data);

    return cloneCells.map((cellItem) => {
      return this.transformFilterCol(cellItem, filterState, keepSortOrder);
    });
  }
  /**
   * Transform table cell by filter state.
   * @param cell The root cell want to transform filterConfigs.
   * @param filterState default value is undefined. 'undefined': 'keep the cell config', 'false': 'reset the filter config fieldValue.
   * @param keepSortOrder @Optional keep cell sort order .
   * @returns A table cell with new config.
   */
  static transformFilterCol(
    cell: TableDataCell,
    filterState: boolean,
    keepSortOrder?: boolean
  ): TableDataCell {
    const isFiltering =
      filterState !== undefined ? filterState : !!cell.isFiltering;
    const defaultConfig = BaseTableFilterUtil.getDefaultFilterConfigs(cell);
    let fieldValue: FilterValue = defaultConfig.fieldValue;
    let comparison: string = defaultConfig.comparison;
    if (filterState !== false) {
      const cellFilterConfigs = cell.filterConfigs;
      if (cellFilterConfigs?.fieldValue) {
        fieldValue =
          BaseTableFilterUtil.getConvertFilterValue(cellFilterConfigs);
      }
      if (cellFilterConfigs?.comparison) {
        comparison = cellFilterConfigs.comparison;
      }
    }
    if (filterState === false) {
      fieldValue = null;
    }

    return {
      ...cell,
      isFiltering,
      nzSortOrder: keepSortOrder ? cell.nzSortOrder : null,
      filterConfigs: {
        ...defaultConfig,
        fieldValue,
        comparison
      }
    };
  }

  static checkCellFiltering(cellItem: TableDataCell): boolean {
    if (!cellItem.isFiltering) {
      return false;
    }

    const { filterConfigs } = cellItem;
    if (!filterConfigs) {
      return false;
    }

    if (!filterConfigs.fieldValue) {
      return false;
    }

    if (filterConfigs.comparison === 'between') {
      if (filterConfigs.type === 'number') {
        if (
          !filterConfigs.fieldValue['start'] &&
          !filterConfigs.fieldValue['end']
        ) {
          return false;
        }
      }
      if (filterConfigs.type === 'date') {
        if (!filterConfigs.fieldValue[0] && !filterConfigs.fieldValue[1]) {
          return false;
        }
      }
    }

    return true;
  }

  static checkRequired(
    cellData: TableDataCell | Array<TableDataCell>
  ): boolean {
    if (Array.isArray(cellData)) {
      return cellData.some((cellItem) => this.checkCellRequired(cellItem));
    }

    return this.checkCellRequired(cellData);
  }

  private static checkCellRequired(cellItem: TableDataCell): boolean {
    cellItem.filterConfigs['required'] = false;
    const { filterConfigs } = cellItem;
    if (!cellItem.isFiltering || !filterConfigs) {
      return false;
    }

    if (!filterConfigs.fieldValue) {
      filterConfigs['required'] = true;
      return true;
    }

    if (
      Array.isArray(filterConfigs.fieldValue) &&
      !filterConfigs.fieldValue?.length
    ) {
      filterConfigs['required'] = true;
      return true;
    }

    const isRequiredBetweenNumber =
      filterConfigs.type === 'number' &&
      (!filterConfigs.fieldValue['start'] || !filterConfigs.fieldValue['end']);
    const isRequiredBetweenDate =
      filterConfigs.type === 'date' &&
      (!Array.isArray(filterConfigs.fieldValue) ||
        filterConfigs.fieldValue.length < 2);
    if (
      filterConfigs.comparison === 'between' &&
      (isRequiredBetweenDate || isRequiredBetweenNumber)
    ) {
      filterConfigs['required'] = true;
      return true;
    }

    return false;
  }

  static getConvertFilterValue(filterConfig: FilterCellConfig): FilterValue {
    const { type, isMulti, fieldValue } = filterConfig;

    if (type === 'selection') {
      let newValue = fieldValue || null;
      if (isMulti) {
        if (!fieldValue) {
          newValue = [];
        }
        newValue = Array.isArray(fieldValue)
          ? fieldValue
          : fieldValue.toString().split(filterConfig.splitChat || ',');
      }
      return newValue;
    }

    return fieldValue || '';
  }

  static getSelectionFilterValue(
    validFilterKey: string,
    filterConfigs: FilterCellConfig
  ): FilterItem {
    if (Array.isArray(filterConfigs.fieldValue)) {
      return {
        fieldName: validFilterKey,
        comparison: filterConfigs.comparison,
        fieldValue: filterConfigs.fieldValue
          .filter(
            (value) => !!new ValidDisplayValuePipe().transform(value).toString()
          )
          .join(filterConfigs.splitChat ? filterConfigs.splitChat : ',')
      };
    }
    return {
      fieldName: validFilterKey,
      comparison: filterConfigs.comparison,
      fieldValue: filterConfigs.fieldValue.toString()
    };
  }
}
