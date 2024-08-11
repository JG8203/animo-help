import { insertProfessorTable } from './tableInsertion'
import { applyDarkMode } from './darkMode'

function getSubject(): string {
  const table = document.querySelector('table[border="0"][align="CENTER"]')
  if (table) {
    const rows = table.querySelectorAll('tr')
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll('td')
      if (cells.length >= 2) {
        const courseCell = cells[1]
        const courseText = courseCell.textContent?.trim()
        if (courseText && /^[A-Z]+\d*$/.test(courseText)) {
          return courseText
        }
      }
    }
  }
  return ''
}

async function main() {
  const subject = getSubject()
  console.log('Current subject:', subject)

  if (subject) {
    chrome.runtime.sendMessage({ action: 'searchProfessors', subject: subject }, (response) => {
      if (response && response.success) {
        const professors = response.data
        if (professors && professors.length > 0) {
          insertProfessorTable(subject, professors)
        } else {
          console.log('No professors found for the subject:', subject)
        }
      } else {
        console.error('Error fetching professor data:', response ? response.error : 'Unknown error')
      }
    })
  } else {
    console.log('No subject found on the page')
  }

  await applyDarkMode()
}

if (document.readyState === 'loading') {
  console.log('Document is loading')
  document.addEventListener('DOMContentLoaded', main)
} else {
  console.log('Document is already loaded')
  main()
}
