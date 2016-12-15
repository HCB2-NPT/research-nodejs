import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectable: true,
            multiSelectable: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        // TODO
    }

    handleSelect() {
        console.log('I was triggered during render')
    }

    render() {
        return (
            <div className="main-container">
                <Paper zDepth={1}>
                    <Table
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                            onRowSelection={this.handleSelect}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Album</TableHeaderColumn>
                                <TableHeaderColumn>Artist</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn>John Smith</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2</TableRowColumn>
                                <TableRowColumn>Randal White</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default MainContainer