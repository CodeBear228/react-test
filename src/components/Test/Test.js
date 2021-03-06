import * as React from "react";
import ReactDOM from "react-dom";

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;

    function UserGreeting() {
        return <h2>用户状态 helloWorld</h2>
    }

    function GuestGreeting() {
        return <h2>游客状态 helloWorld</h2>
    }

    if (isLoggedIn) {
        return <UserGreeting/>
    } else {
        return <GuestGreeting/>
    }
}

function LoginButton(props) {
    return (
        <button onClick={props.click}>
            Login
        </button>
    )
}

function LogoutButton(props) {
    return (
        <button onClick={props.click}>
            Logout
        </button>
    )
}

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};

        this.loginClick = this.loginClick.bind(this);
        this.logoutClick = this.logoutClick.bind(this);
    }

    loginClick() {
        this.setState({isLoggedIn: true})
    }

    logoutClick() {
        this.setState({isLoggedIn: false})
    }

    render() {
        let button = null;
        if (this.state.isLoggedIn) {
            button = <LogoutButton click={this.logoutClick}/>
        } else {
            button = <LoginButton click={this.loginClick}/>
        }

        return (
            <div>
                <Greeting isLoggedIn={this.state.isLoggedIn}/>
                {button}
            </div>
        )
    }

}

ReactDOM.render(
    <Test/>,
    document.getElementById('test1')
);

//深拷贝递归运用
function deepCopy(newObj, oldObj) {
    for (let k in oldObj) {
        //不仅是对象里面要递归，并且数组内部也要递归，不然可能出现数组里面是对象的情况
        if (oldObj[k] instanceof Array) {
            newObj[k] = [];
            deepCopy(newObj[k],oldObj[k])
            //这两个的方向判断不能调换，因为array instanceof Object 也是 true
        } else if(oldObj[k] instanceof Object){
            newObj[k] = {};
            deepCopy(newObj[k], oldObj[k])
        } else {
            newObj[k] = oldObj[k]
        }
    }
}

//深拷贝运用Json方法
function deepCopy2(newObj, oldObj){
    newObj = JSON.parse(JSON.stringify(oldObj));
}

let a = {
    a: 12,
    b: 3,
    c: {name: 'Cobe', age: 39},
    arr: [1, 2, 3, 4, 9, 123],
    state: null
};
let b = {};
deepCopy(b, a);
console.log(b);

export default Test;
