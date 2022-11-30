export class MatDialogMock {
    returnValue = '';
    open() {
      return {
        afterClosed: () => this.returnValue
      };
    }
    close(value = '') { }
};

  