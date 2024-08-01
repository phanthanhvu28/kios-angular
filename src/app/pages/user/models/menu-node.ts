export interface NodeParent {
    title:    string;
    key:      string;
    expanded: boolean;
    children: NodeChild[];
}

export interface NodeChild {
    title:    string;
    key:      string;
    expanded: boolean;
    children: ChildChild[];
}

export interface ChildChild {
    title:  string;
    key:    string;
    isLeaf: boolean;
}