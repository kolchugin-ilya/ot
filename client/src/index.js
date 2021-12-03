import React from 'react';
import ReactDOM from 'react-dom';
import {indexStore} from "./store/indexStore";
import App from "./App";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Box, Grommet} from "grommet";
import {myTheme} from "./myTheme";

ReactDOM.render(
    <Grommet theme={myTheme}>
        <Box>
            <BrowserRouter>
                <Provider store={indexStore}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </Box>
    </Grommet>,
    document.getElementById('root'));

