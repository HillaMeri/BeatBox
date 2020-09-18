import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { ChatBox } from '../cmps/box-details/ChatBox'
import Picker from 'emoji-picker-react';
import { SongList } from '../cmps/box-details/SongList'
import { BoxInfo } from '../cmps/box-details/BoxInfo'
import { loadBox, saveBox } from '../store/actions/boxAction'
import { boxService } from '../services/boxService'
import { userService } from '../services/userService';
import { FilterBox } from "../cmps/boxes/FilterBox";
import { Fab } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';


class _BoxDetails extends Component {
    state = {
        box: null,
        filterBy: '',
        isSearchOpen: false
    }

    async componentDidMount() {
        const boxId = this.props.match.params.boxId;
        const minimalUser = userService.getMinimalUser();
        await boxService.addConnectedUser(boxId, minimalUser);
        await this.props.loadBox(boxId);
        const { box } = this.props;
        this.setState({ box })
    }

    onRemoveSong = (ev, songId) => {
        ev.stopPropagation();
        ev.preventDefault();
        const box = { ...this.state.box }
        const songIdx = box.songs.findIndex(song => song.id === songId)
        box.songs.splice(songIdx, 1);
        this.props.saveBox(box)
        // await this.props.removeSong(songId)
    }

    onAddSong = (song) => {
        const newSong = boxService.addSong(song)
        const box = { ...this.state.box }
        box.songs.push(newSong)
        this.props.saveBox(box)
    }

    onPlaySong = (currSongIdx) => {
        const box = { ...this.state.box, currSongIdx };
        this.props.saveBox(box);
    }

    onSaveInfo = (box) => {
        this.props.saveBox(box);
    }

    onEmojiClick = (event, emojiObject) => {
        console.log("onEmojiClick -> emojiObject", emojiObject)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy: filterBy.name })
    }

    getSongsForDispley = () => {
        const songs = this.state.box.songs.filter(song => song.title.toLowerCase().includes(this.state.filterBy.toLowerCase()));
        return songs;
    }

    openAddSearch = () => {
        console.log(';');
        this.setState({ isSearchOpen: !this.state.isSearchOpen })
    }

    render() {
        const { box, isSearchOpen } = this.state;
        if (!box) return <h1>Loading...</h1>
        const songsToShow = this.getSongsForDispley();
        return (
            <section className="box-details main-container">
                <BoxInfo box={box} onSaveInfo={this.onSaveInfo} />
                <FilterBox onSetFilter={this.onSetFilter} />
                {/* <Picker onEmojiClick={this.onEmojiClick} /> */}
                {/* <Fab className="add-song-btn" onClick={this.openAddSearch} color="primary" aria-label="add">
                    <AddCircleOutline />
                </Fab> */}
                <SongList
                    songs={songsToShow}
                    onPlaySong={this.onPlaySong}
                    onRemoveSong={this.onRemoveSong}
                    onAddSong={this.onAddSong}
                    isSearchOpen={isSearchOpen}
                    openAddSearch={this.openAddSearch} />

                {/* <ChatBox /> */}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        box: state.boxReducer.currBox
    }
}


const mapDispatchToProps = {
    loadBox,
    saveBox
}

export const BoxDetails = connect(mapStateToProps, mapDispatchToProps)(_BoxDetails)