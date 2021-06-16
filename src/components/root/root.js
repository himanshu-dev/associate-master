import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './root.scss';
import 'font-awesome/css/font-awesome.min.css'
import {AppRouter} from "../app-router";
import {Config} from "../../config/config";
import ErrorBoundaries from "../error-boundaries/error-boundaries";

function Root() {
    document.title = Config.APP_NAME;

    return (
        <ErrorBoundaries>
            <AppRouter/>
        </ErrorBoundaries>
    );
}

export default Root;
