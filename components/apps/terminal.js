import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: ["books", "projects", "personal-documents", "skills", "languages", "PDPU", "interests"],
            PDPU: ["Sem-6"],
            books: ["Eric-Jorgenson_The-Almanack-of-Naval-Ravikant.pdf", "Elon Musk: How the Billionaire CEO of SpaceX.pdf", "The $100 Startup_CHRIS_GUILLEBEAU.pdf", "The_Magic_of_Thinking_Big.pdf"],
            skills: ["Front-end development", "React.js", "jQuery", "Flutter", "Express.js", "SQL", "Firebase"],
            projects: ["vivek9patel-personal-portfolio", "synonyms-list-react", "economist.com-unlocked", "Improve-Codeforces", "flutter-banking-app", "Meditech-Healthcare", "CPU-Scheduling-APP-React-Native"],
            interests: ["Software Engineering", "Deep Learning", "Computer Vision"],
            languages: ["Javascript", "C++", "Java", "Dart"],
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.appendTerminalRow();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">boris@chen</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-ubt-blue">'${file}'</span>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = async (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `bash: cd: ${words}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory                    `;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/boris")
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands:[ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg]";
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "avril":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("avril");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "todoist":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("todo-ist");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "about-boris":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("about-boris");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "sendmsg":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, avril, chrome, about-boris, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "sudo":

                ReactGA.event({
                    category: "Sudo Access",
                    action: "lol",
                });

                result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            case "chat":
                result = await callXunfeiChatbot(rest);
                break;
            default:
                result = await callXunfeiChatbot(command);
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }


    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}

async function callXunfeiChatbot(message) {
    const url = "/api/v1/chat/completions";  // 这会被重写成 https://spark-api-open.xf-yun.com/v1/chat/completions
    const data = {
        "model": "4.0Ultra",
        "messages": [
            {
                "role": "system",
                "content": "You are an AI assistant trained to provide answers based on a predefined set of questions and answers. When a user asks a question, respond with the relevant answer from the following list: 1. What is the IDAT 7211 course about? - IDAT 7211 is a course in the Department of Mechanical Engineering at the University of Hong Kong, focusing on Innovation and R&D Principles. 2. What is Yiming (Kevin) Rong's educational background? - Yiming (Kevin) Rong holds a BS in ME from Harbin University of Science & Technology, an MS in ME from Tsinghua University, Beijing, China, an MS in IE from University of Wisconsin-Madison, USA, and a Ph.D in ME from University of Kentucky, USA. 3. At which universities has Yiming (Kevin) Rong served as a professor? - He has served as a professor at Tsinghua University, Southern Illinois University, Worcester Polytechnic Institute, Tsinghua University, Southern University of Science and Technology, and The University of Hong Kong. 4. What questions does Yiming (Kevin) Rong have for the students? - He asks if students have a BS from HKU, if their BS major is non-ME, if they have CAD experience, if they are familiar with additive manufacturing, and what their expectations are for the course. 5. What is the definition of engineering? - Engineering is defined as the science of USEFUL processes, phenomena, and devices. 6. What are the stages of development in engineering? - The development of engineering has gone through stages such as pre-scientific revolution, industrial revolution, second industrial revolution, and information revolution. 7. What characteristics did engineers have in the 19th and first half of the 20th century? - Engineers in the 19th and first half of the 20th century focused on hands-on training and gradually increased mathematical modeling. 8. What characteristics did engineers have in the second half of the 20th century? - Engineers in the second half of the 20th century became more science-based, although 'design' content increased slowly. 9. What skills will engineers need in the 21st century? - Engineers in the 21st century will need the ability to identify new needs, find new solutions, and make things happen. 10. What is an entrepreneurial engineer? - An entrepreneurial engineer is an engineer with an entrepreneurial spirit and managerial skills to identify needs, come up with new solutions, and see them through. 11. What basic skills do engineers need to master? - Engineers need the ability to find any information quickly, evaluate, and use that information. 12. How do modern engineering tools assist engineers? - Modern engineering tools free engineers from routine calculations and allow them to analyze tasks that would have been impossible a decade or two ago. 13. Why is collaboration and teamwork required in modern engineering design? - The complexity of modern engineering designs and the speed at which they must be developed call for collaboration and teamwork. 14. How do engineers realize their imagination? - Engineers realize their imagination through an entrepreneurial spirit and managerial skills. 15. What role does AI play in the field of engineering? - The role of AI in engineering is not explicitly stated in the document, but it is speculated to involve automation, data analysis, and decision support. 16. What are the two goals of higher education? - The two goals of higher education are to become an expert and to solve real problems. 17. What is the impact of the global economy on industrial activities? - The global economy has made industrial activities require fewer specialized tasks, fewer workers, smaller rewards, and fewer large enterprises. 18. What does three-dimensional education include? - Three-dimensional education includes academic, entrepreneurial, and humanity aspects. 19. What does humanity education in engineering include? - Humanity education in engineering includes understanding society, social responsibility, cultural enrichment, and becoming a high-quality human being. 20. What non-technical skills does an entrepreneurial engineer need? - An entrepreneurial engineer needs non-technical skills such as effective communication in various contexts, understanding of professional & ethical responsibility, understanding solution impacts and sustain/exploit benefits, project management, and relationship management. 21. What are computational thinking, design thinking, systematic thinking, and strategic thinking? - Computational thinking, design thinking, systematic thinking, and strategic thinking are directions for future-oriented engineering education, involving problem space and solution space, innovation, and innovative design. 22. What is innovation? - Innovation is the process of product development, value creation, value propagation, and value realization. 23. What is innovative design? - Innovative design is the approach to innovation and the process from manufacturing to market. 24. What is the 'S' Curve on Value? - The 'S' Curve on Value describes the growth of value in the product life cycle. 25. How to improve your value proposition? - Improving your value proposition requires quantitative and easily understandable statements. 26. What is the first assignment of the IDAT 7211 course? - The first assignment of the IDAT 7211 course is to form a project group, submit the group list in the Moodle system, find a common time to meet with the instructor, consider a project area, and prepare several project topics for discussion next week."
            },
            {
                "role": "user",
                "content": message
            }
        ],
        "stream": true
    };
    
    
    const headers = {
        "Authorization": "Bearer QTzclMhOLmyRGrcbHSLw:WZrInrHlLxWmnDpgLMLl",
        "Content-Type": "application/json"
    };

    try {
        console.log('Sending request to:', url);
        console.log('Request headers:', headers);
        console.log('Request body:', JSON.stringify(data));
        
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        let result = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += new TextDecoder().decode(value);
        }

        // 解析流式响应
        const lines = result.split('\n');
        let finalResponse = '';
        for (const line of lines) {
            if (line.startsWith('data:')) {
                const jsonStr = line.slice(5).trim();
                if (jsonStr && jsonStr !== '[DONE]') {
                    const jsonObj = JSON.parse(jsonStr);
                    if (jsonObj.choices && jsonObj.choices[0].delta.content) {
                        finalResponse += jsonObj.choices[0].delta.content;
                    }
                }
            }
        }



        return finalResponse;
    } catch (error) {
        console.error('Error details:', error);
        return `Error: ${error.message}. 请检查控制台以获取更多信息。`;
    }
}
