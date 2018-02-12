export interface IForm {
  readonly form: {
    readonly isPrivate: boolean;
    readonly text: string;
  };
}

export interface IItem {
  readonly date: string;
  readonly id: number;
  readonly private: boolean;
  readonly text: string;
  readonly userId: string;
}

export interface IList {
  readonly filterId: 'all' | 'public' | 'private';
  readonly list: IItem[];
}

export type IMessageState = IForm & IList;
