export class DataBaseUtil {

  static initializeTables(tablesList: Array<Object>) {
    tablesList.forEach((table: any) => {
      table.drop()
      .then(
        () => {
          console.log(`${new Date} Table ${table} was successfully droped.`);
          table.sync()
          .then(
            () => console.log(`${new Date} Table ${table} was successfully created.`),
            (error: Error) => console.log(`Error was raised during the process, see details: ${error}`)
          );
        },
        (error: Error) => console.log(`Error was raised during the process, see details: ${error}`)
      )
    });
  }
}