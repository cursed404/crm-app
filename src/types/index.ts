export interface Row {
    id: string;
    parentId: string | null;
    title: string;
    value: number;
    isEditing?: boolean;
    isNew?: boolean;
    children?: Row[];
  }
  