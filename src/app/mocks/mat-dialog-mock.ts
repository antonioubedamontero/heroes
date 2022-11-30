import { of } from "rxjs";

let returnMatDialogClose = true;

export class MatDialogMock {
    open() {
      return {
        afterClosed: () => of(returnMatDialogClose)
      };
    }
    close(value = '') { }
};

export const setMatDialogCloseValue = (value: any): void => {
  returnMatDialogClose = value;
}
