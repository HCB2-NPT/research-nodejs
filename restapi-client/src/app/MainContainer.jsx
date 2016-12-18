import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDelete from 'material-ui/svg-icons/action/Delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/Mode-Edit';
import TextField from 'material-ui/TextField';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectable: true,
            multiSelectable: false,
            webAPI: 'http://localhost:3000',
            albums: [],
            open: false,
            openEditDialog: false,
            openInsertDialog: false,
            currentAlbum: {
                album: '',
                artist: '',
                tracks: []
            },
            currentTrack: {
                name: '',
                artists: []
            },
            _name: '',
            _artists: '',
            _index: 0,
            _text: ''
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this);
        this.handleCloseInsertDialog = this.handleCloseInsertDialog.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.getArtists = this.getArtists.bind(this);
        this.deleteTrack = this.deleteTrack.bind(this);
        this.editTrack = this.editTrack.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeArtists = this.handleChangeArtists.bind(this);
        this.handleEditTrack = this.handleEditTrack.bind(this);
        this.convertToArr = this.convertToArr.bind(this);
        this.deleteAlbum = this.deleteAlbum.bind(this);
        this.insertAlbum = this.insertAlbum.bind(this);
        this.handleChangeTextbox = this.handleChangeTextbox.bind(this);
        this.handleInsertTrack = this.handleInsertTrack.bind(this);
    }

    componentDidMount() {
        axios.get(this.state.webAPI + '/api/albums').then((res) => {
            this.setState({
                albums: res.data
            });
        }).catch((err) => {
            console.error(err);
        });
    }

    handleSelect(album) {
        this.setState({ open: true });
        this.setState({ currentAlbum: album })
    }

    handleCloseDialog() {
        this.setState({open: false});
    }

    handleCloseEditDialog() {
        this.setState({openEditDialog: false});
    }

    handleCloseInsertDialog() {
        this.setState({openInsertDialog: false});
    }

    getArtists(artists) {
        let _artists = '';
        let isFirst = true;
        artists.map((artist) => {
            if (isFirst) {
                isFirst = false;
                _artists += artist;
            } else {
                _artists += ', ' + artist;
            }
        });

        return _artists;
    }

    setTitle(index, trackName) {
        return (index + 1) + ' - ' + trackName;
    }

    deleteTrack(index) {
        this.state.currentAlbum.tracks.splice(index, 1);
        axios.patch(this.state.webAPI + '/api/albums/' + this.state.currentAlbum._id,
                this.state.currentAlbum).then((res) => {
            alert('Remove track successfully!');
            this.handleCloseDialog();
        }).catch((err) => {
            console.error(err);
        });
    }

    editTrack(index) {
        this.setState({ _index: index })
        this.setState({ open: false} );
        this.setState({ openEditDialog: true});
        this.setState({ currentTrack: this.state.currentAlbum.tracks[index] });
    }

    handleChangeName(e) {
        this.setState({ _name: e.target.value });
    }

    handleChangeArtists(e) {
        this.setState({ _artists: e.target.value });
    }

    handleEditTrack() {
        let track = this.state.currentAlbum.tracks[this.state._index];
        track.name = (this.state._name) ? this.state._name : track.name;
        track.artists = this.convertToArr(this.state._artists);

        let album = this.state.currentAlbum;
        album.tracks[this.state._index] = track;

        this.setState({ currentAlbum: album });

        axios.patch(this.state.webAPI + '/api/albums/' + this.state.currentAlbum._id,
                this.state.currentAlbum).then((res) => {
            alert('Update successfully!');
            this.handleCloseEditDialog();
        }).catch((err) => {
            console.error(err);
        });
    }

    convertToArr(text) {
        let arr = text.split(', ');
        return arr;
    }

    deleteAlbum() {
        axios.delete(this.state.webAPI + '/api/albums/' + this.state.currentAlbum._id,
                this.state.currentAlbum).then((res) => {
            alert('Delete successfully!');
            window.location.href = '/';
        }).catch((err) => {
            console.error(err);
        });
    }

    insertAlbum() {
        this.setState({ openInsertDialog: true });
    }

    handleChangeTextbox(e) {
        this.setState({ _text: e.target.value });
    }

    handleInsertTrack() {
        axios.post(this.state.webAPI + '/api/albums/',
                JSON.parse(this.state._text)).then((res) => {
            alert('Insert successfully!');
            window.location.href = '/';
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        const action = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleCloseDialog}/>
        ];

        const actionEdit = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleCloseEditDialog}/>,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleEditTrack}/>
        ];

        const actionInsert = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleCloseInsertDialog}/>,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleInsertTrack}/>
        ];

        return (
            <div className="main-container">
                <FloatingActionButton className="btn-insert" onClick={this.insertAlbum}>
                    <ContentAdd />
                </FloatingActionButton>
                <Paper zDepth={1}>
                    <Table
                            className="tracks-table"
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Album</TableHeaderColumn>
                                <TableHeaderColumn>Artist</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.state.albums.map((album, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{album.album}</TableRowColumn>
                                    <TableRowColumn>{album.artist}</TableRowColumn>
                                    <TableRowColumn>
                                        <FlatButton label="Details" onClick={() => this.handleSelect(album)} primary={true} />
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Dialog
                        title={this.state.currentAlbum.album}
                        actions={action}
                        modal={true}
                        open={this.state.open}
                        titleClassName="tracks-title"
                        onRequestClose={this.handleCloseDialog}>
                    Artist: {this.state.currentAlbum.artist}
                    <a href="#" onClick={this.deleteAlbum} className="btn-delete">Delete this album</a>
                    <List className="tracks-list">
                        {this.state.currentAlbum.tracks.map((row, index) => (
                            <ListItem key={index} primaryText={this.setTitle(index, this.state.currentAlbum.tracks[index].name)}
                                    secondaryText={this.getArtists(this.state.currentAlbum.tracks[index].artists)}
                                    nestedItems={[
                                <ListItem key={1} primaryText="Delete" rightIcon={<ActionDelete />}
                                    onClick={() => this.deleteTrack(index)} />,
                                <ListItem key={2} primaryText="Edit" rightIcon={<EditorModeEdit />}
                                    onClick={() => this.editTrack(index)}/>
                            ]}/>
                        ))}
                    </List>
                </Dialog>
                <Dialog
                        title={this.state.currentAlbum.album}
                        actions={actionEdit}
                        modal={false}
                        open={this.state.openEditDialog}
                        titleClassName="tracks-title"
                        onRequestClose={this.handleCloseEditDialog}>
                    <TextField
                        hintText="Track Name"
                        defaultValue={this.state.currentTrack.name}
                        floatingLabelText="Track Name"
                        onChange={this.handleChangeName}
                        floatingLabelFixed={true}/><br/>
                    <TextField
                        hintText="Artists"
                        defaultValue={this.getArtists(this.state.currentTrack.artists)}
                        floatingLabelText="Artists"
                        onChange={this.handleChangeArtists}
                        floatingLabelFixed={true}/>
                </Dialog>
                <Dialog
                        title="Insert new album"
                        actions={actionInsert}
                        modal={false}
                        open={this.state.openInsertDialog}
                        titleClassName="tracks-title"
                        onRequestClose={this.handleCloseInsertDialog}>
                    <textarea className="textbox" rows="4" cols="50" onChange={this.handleChangeTextbox}></textarea>
                </Dialog>
            </div>
        )
    }
}

export default MainContainer