import React, {Component} from 'react';
import {BrowserRouter, HashRouter as Router, Route, Switch} from "react-router-dom";
import {ListAssociate} from "./list-associate";
import {AddAssociate} from "./add-associate";

export class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <React.Suspense fallback={<div>loading...</div>}>
                    <Router>
                        <Switch>

                            <Route exact path='/' component={ListAssociate}/>
                            <Route exact path='/list-associate' component={ListAssociate}/>
                            <Route exact path='/add-associate' component={AddAssociate}/>
                            <Route exact path='/update-associate/:id' component={AddAssociate}/>

                        </Switch>
                    </Router>
                </React.Suspense>
            </BrowserRouter>
        );
    }
}
