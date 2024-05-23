function escapeString(str) {
  return ('' + str).replace(/"/g, '\\"');
}

export const dataToCsv = (data, columns) => {
    const csvRows = [];
  
    const headers = columns.map(column => column.accessor).filter((value, index, self) => self.indexOf(value) === index);
    csvRows.push(headers.join(','));

    console.log("Data: ", data);
    console.log("Columns: ", columns);

    data.forEach(row => {
      const values = [];
      headers.forEach(header => {
        let currentObject = row.values;
        const parts = header.split('.');

          for(let i = 0; i < parts.length; i++) {
            if(currentObject[parts[i]] ){
              currentObject = currentObject[parts[i]];
            } else {
              return '';
            }
          }

          if(Array.isArray(currentObject)){
            values.push (`"${currentObject.join(',')}"`);
          } else if(typeof currentObject === 'object' && currentObject !== null){
            values.push(`"${JSON.stringify(currentObject)}"`);
          } else{
            values.push(escapeString(currentObject));
          }
      });
      csvRows.push(values.join(','));
    });
  
    return csvRows.join('\n');
  };
  