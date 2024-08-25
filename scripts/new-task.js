$(function () {
  $('.task-repeat').selectmenu({
    icons: { 
      button: "ui-icon-caret-1-s" 
    },
    open: (event) => {
      $(event.target).selectmenu( "option", "icons", { button: "ui-icon-caret-1-n" } );
    },
    close: (event) => {
      $(event.target).selectmenu( "option", "icons", { button: "ui-icon-caret-1-s" } );
    }
  });
});