// REQUIRED MODULES
const   electron = require("electron"),
        url = require("url"),
        path = require("path"),
        ejse = require("ejs-electron"),
        remote = require("electron").remote;

var {app, BrowserWindow, Menu} = electron;
let mainWindow;



// listen for the app to be ready
app.on('ready', function(){
    // create a new window
    mainWindow = new BrowserWindow({width: 800, height: 820, resizable: false});
    // load html file into the window
    mainWindow.loadURL("file://" + __dirname + "/views/index.ejs");
    // build menu from template
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed', function(){
    app.quit();
    });
});


// CREATE MENU TEMPLATE
const menuTemplate = [
    {
        label: "ColorGame"
    },
    {
        label: "Game",
        submenu: [{label: "Quit",
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click: () => {
            app.quit();
        }}]
    }
]



