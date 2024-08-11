interface Professor {
    payload: {
      name: string;
      w_reviews: string;
    };
  }
  
  export function insertProfessorTable(subject: string, professors: Professor[]) {
    const container = document.createElement('div');
    container.id = 'professor-table-container';
    container.style.display = 'inline-block';
    container.style.verticalAlign = 'top';
    container.style.marginLeft = '20px';
    container.style.maxWidth = '400px';
  
    const table = createProfessorTable(subject, professors);
    container.appendChild(table);
  
    const resultsTable = document.querySelector('table[border="0"][align="CENTER"]');
    if (resultsTable && resultsTable.parentNode) {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'flex-start';
      
      resultsTable.parentNode.insertBefore(wrapper, resultsTable);
      wrapper.appendChild(resultsTable);
      wrapper.appendChild(container);
    }
  }
  
  function createProfessorTable(subject: string, professors: Professor[]): HTMLTableElement {
    const table = document.createElement('table');
    table.border = '0';
    table.align = 'center';
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
  
    // Header
    const headerRow = table.insertRow();
    const headerCell = headerRow.insertCell();
    headerCell.colSpan = 2;
    headerCell.align = 'center';
    headerCell.className = 'data';
    headerCell.style.backgroundColor = '#338000';
    headerCell.style.color = '#FFFFFF';
    headerCell.textContent = `Professors for ${subject}`;
  
    // Subheader
    const subHeaderRow = table.insertRow();
    ['Name', 'Reviews'].forEach(text => {
      const cell = subHeaderRow.insertCell();
      cell.align = 'center';
      cell.className = 'data';
      cell.style.backgroundColor = '#338000';
      cell.style.color = '#FFFFFF';
      cell.textContent = text;
    });
  
    // Professor rows
    professors.forEach((prof, index) => {
      const row = table.insertRow();
      ['name', 'w_reviews'].forEach(key => {
        const cell = row.insertCell();
        cell.className = 'data';
        cell.style.backgroundColor = index % 2 === 0 ? '#D2EED3' : '#FFFFFF';
        cell.style.padding = '5px';
        cell.style.fontSize = '12px';
        cell.textContent = prof.payload[key as keyof typeof prof.payload] || (key === 'w_reviews' ? 'No reviews' : '');
      });
    });
  
    return table;
  }
  