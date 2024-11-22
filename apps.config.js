import displayAvril from './components/apps/avril';
import displayGithub from './components/apps/github';
import displayVsCode from './components/apps/vscode';
import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayChrome } from './components/apps/chrome';
import { displayTrash } from './components/apps/trash';
import { displayGedit } from './components/apps/gedit';
import { displayAboutBoris } from './components/apps/boris';
import { displayTerminalCalc } from './components/apps/calc';

const apps = [
    {
        id: "about-boris",
        title: "About Me (Double-Click!)",
        icon: './themes/Yaru/system/earth.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAboutBoris,
    },
    {
        id: "github",
        title: "Github",
        icon: './themes/Yaru/apps/github.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: false,
        screen: displayGithub,
    },
    {
        id: "chrome",
        title: "Google Chrome",
        icon: './themes/Yaru/apps/chrome.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayChrome,
    },
    {
        id: "avril",
        title: "beloved Avril",
        icon: './themes/Yaru/apps/letgo.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAvril,
    },
    {
        id: "calc",
        title: "Calculator",
        icon: './themes/Yaru/apps/calc.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: false,
        screen: displayTerminalCalc,
    },
    {
        id: "vscode",
        title: "Visual Studio Code (wode_scratchs)",
        icon: './themes/Yaru/apps/vscode.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayVsCode,
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/bash.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/gnome-control-center.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: false,
        screen: displaySettings,
    },
    {
        id: "trash",
        title: "Trash",
        icon: './themes/Yaru/system/user-trash-full.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: false,
        screen: displayTrash,
    },
    {
        id: "gedit",
        title: "Contact Me",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: false,
        screen: displayGedit,
    },
]

export default apps;