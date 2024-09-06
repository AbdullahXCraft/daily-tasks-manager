import { TaskRecord } from "./tasks.js";

$(function () {
  const tasks = new TaskRecord('tasks');
  tasks.taskItems.forEach((element, index) => {
    $('#task-select').append(`<option value="${index}">${element.taskName}</option>`)
  });
  let index = -1;
  $('#task-select').selectmenu({
    icons: { 
      button: "ui-icon-caret-1-s" 
    },
    open: (event) => {
      $(event.target).selectmenu( "option", "icons", { button: "ui-icon-caret-1-n" } );
    },
    close: (event) => {
      $(event.target).selectmenu( "option", "icons", { button: "ui-icon-caret-1-s" } );
    },
    change: () => {
      index = $('#task-select').val();
      updateCal();
    }
  });
  let calDetails = {
    year: parseInt(dayjs().format('YYYY')),
    startMonth: parseInt((parseInt(dayjs().format('M')) - 1) / 3) * 3 + 1,
  }



  $('#prev-year').on('click', () => {
    if (calDetails.startMonth > 1) {
      calDetails.startMonth -= 3
    } else {
      calDetails.startMonth = 10;
      calDetails.year--;
    }
    updateCal();
  });
  $('#next-year').on('click', () => {
    if (calDetails.startMonth < 10) {
      calDetails.startMonth += 3
    } else {
      calDetails.startMonth = 1;
      calDetails.year++;
    }
    updateCal();
  });
  // Initial chart rendering
  function renderCalendarChart() {
    if (index >= 0 && index < tasks.taskItems.length) {
      $('#myChart').empty();
      $('#myChart').zingchart({
        data: {
          labels:[
            {
              text: calDetails.year.toString(),
              fontFamily: 'andika, san-serif',
              fontColor: 'var(--primary-color)',
              textAlign: 'center',
              width: '100%',
              fontSize: 18,
              y: '3%',
              fontWeight: 'bold',
              mediaRules: [
                {
                  minWidth: 580,
                  visible: false
                }
              ]
            }
          ],
          plot: {
            valueBox: { // Use this object to configure the value boxes.
              fontColor: 'white',
              rules: [
              {
                rule: `"%data-day" == "${dayjs().format('YYYY-MM-DD')}"`,
                text: 'Today'
              },
              {
                rule: `%v == 1`,
                text: '✔',
              }
            ]
            },
            tooltip: { // Use this object to to configure the tooltips.
              text: 'Done on %data-day',
        
              backgroundColor: 'var(--primary-highlight-color)',
              borderColor: 'var(--primary-text-color)',
              borderWidth: 2,
              borderRadius: 3,
              fontColor: 'var(--primary-text-color)',
              fontFamily: 'Andika, sans-serif',
              fontSize: 18,
              offsetY: -10,
              align: 'center'
            }
          },
          type: 'calendar',
          options: {
            palette: [ 'white', '#7fb069' ],
            values: tasks.getTaskData(index),
            year: {
              text: calDetails.year.toString(),
              fontFamily: 'Andika, sans-serif',
              fontColor: 'var(--primary-color)',
              mediaRules: [{
                maxWidth: 580,
                visible: false
              }]
            },
            month: {
              item: {
                fontFamily: 'Andika, sans-serif',
                fontSize: 18,
                fontColor: 'var(--primary-color)'
              },
              outline: {
                borderColor: 'var(--primary-color)',
                borderWidth: 2,
              }
            },
            weekday: {
              values: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              item: {
                paddingRight: 10,
                fontFamily: 'Andika, sans-serif',
                fontSize: 18,
                fontColor: 'var(--primary-color)',
                mediaRules: [{
                  maxWidth: 580,
                  paddingRight: 0,
                  fontSize: 10
                }]
              }
            },
            day: { // Configure the styling by day.
              items: { // Use this object to style the cells by individual calendar day.
                ['d-' + dayjs().format('YYYY-MM-DD')]: {
                  backgroundColor: 'var(--alert-error-color)',
                }
              },
              inactive: { // Use this object to style the cells of all inactive days.
                backgroundColor: 'gray',
                borderColor: 'var(--primary-text-color)'
              },
              active: { // Use this object to style the cells of all inactive days.
                borderColor: 'var(--primary-text-color)'
              }
            },
            startMonth: calDetails.startMonth,
            endMonth: calDetails.startMonth + 2
          },
          
          backgroundColor: 'var(--primary-text-color)',
          plotarea: {
            marginTop: '30%',
            marginRight: 0,
            marginLeft: 0,
            
            mediaRules: [
              {
                minWidth: 580,
                marginTop: 0
              }
            ]
          }
        },
        height: 200
      });
    } else {
      $('#myChart').html('No task has been Selected');
    }
  }
  
  // Render the calendar for 2023 initially
  renderCalendarChart();
  
  // Function to dynamically change the year by re-rendering the chart
  function updateCal() {
    // Destroy the existing chart
    $('#myChart').destroy();
  
    // Re-render the chart with the new year
    renderCalendarChart();
  }
});