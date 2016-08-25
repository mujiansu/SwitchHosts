/**
 * @author oldj
 * @blog http://oldj.net
 */

'use strict';

import React from 'react';
import classnames from 'classnames';
import './buttons.less';

export default class Buttons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            top_toggle_on: true
        };

        this.on_items = null;

        SH_event.on('toggle_host', (on) => {
            if (on && !this.state.top_toggle_on) {
                this.setState({
                    top_toggle_on: true
                });
                this.on_items = null;
            }
        });
    }

    static btnAdd() {
        SH_event.emit('add_host');
    }

    btnToggle() {
        if (this.state.top_toggle_on) {
            SH_event.emit('get_on_hosts', (items) => {
                this.on_items = items;
            });
        }

        this.setState({
            top_toggle_on: !this.state.top_toggle_on
        }, () => {
            SH_event.emit('top_toggle', this.state.top_toggle_on, this.on_items);
            if (this.state.top_toggle_on) {
                this.on_items = null;
            }
        });
    }

    render() {
        return (
            <div id="sh-buttons">
                <div className="left">
                    <a
                        className="btn-add"
                        href="#"
                        onClick={() => Buttons.btnAdd()}
                    >+</a>
                </div>

                <div className="right">
                    <i className="iconfont icon-search"/>
                    <i
                        className={classnames({
                            iconfont: 1,
                            'icon-switchon': this.state.top_toggle_on,
                            'icon-switchoff': !this.state.top_toggle_on
                        })}
                        onClick={() => this.btnToggle()}
                    />
                </div>
            </div>
        );
    }
}
