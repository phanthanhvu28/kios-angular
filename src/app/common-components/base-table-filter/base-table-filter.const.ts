export const DEBOUNCE_FIRE_CHANGE_FILTER = 300;
export const CELL_FILTER_COMPARISONS = {
  text: [
    {
      label: 'is',
      value: '=='
    },
    {
      label: 'is not',
      value: '!='
    }
  ],
  date: [
    {
      label: 'is equal to',
      value: '=='
    },
    {
      label: 'is between',
      value: 'between'
    },
    {
      label: 'is before',
      value: '<'
    },
    {
      label: 'is before or on',
      value: '<='
    },
    {
      label: 'is after',
      value: '>'
    },
    {
      label: 'is on or after',
      value: '>='
    }
  ],
  'range-date': [
    {
      label: 'is in range',
      value: 'inRange'
    },
    {
      label: 'is before range',
      value: '<'
    },
    {
      label: 'is after range',
      value: '>'
    }
  ],
  number: [
    {
      label: 'is equal to',
      value: '=='
    },
    // {
    //   label: 'is between',
    //   value: 'between'
    // },
    {
      label: 'is less than',
      value: '<'
    },
    {
      label: 'is less than or equal',
      value: '<='
    },
    {
      label: 'is greater than',
      value: '>'
    },
    {
      label: 'is equal or greater than',
      value: '>='
    }
  ],
  selection: []
};
