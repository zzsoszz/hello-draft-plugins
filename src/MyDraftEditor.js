import React, { Component } from 'react';

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import editorStyles from './editorStyles.module.css';
import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';
import blockTypeSelectStyles from './blockTypeSelectStyles.module.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import styled from  "styled-components";
import BlockTypeSelect  from  "draft-js-side-toolbar-plugin/lib/components/BlockTypeSelect";




class HeadlinesPicker extends Component {
    componentDidMount() {
        setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    }

    onWindowClick = () =>
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        this.props.onOverrideContent(undefined);

    render() {
        const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
        return (
            <div>
                {buttons.map((Button, i) => // eslint-disable-next-line
                    <Button key={i} {...this.props} />
                )}
            </div>
        );
    }
}


class HeadlinesButton extends Component {

    onClick = () =>
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        this.props.onOverrideContent(HeadlinesPicker);

    render() {
        return (
            <div className={editorStyles.headlineButtonWrapper}>
                <button onClick={this.onClick} className={editorStyles.headlineButton}>
                    H
                </button>
            </div>
        );
    }
}




const DefaultBlockTypeSelect = ({ getEditorState, setEditorState, theme }) => (
    <BlockTypeSelect
        getEditorState={getEditorState}
        setEditorState={setEditorState}
        theme={theme}
        structure={[
            HeadlineOneButton,
            HeadlineTwoButton,
            UnorderedListButton
        ]}
    />
);


const sideToolbarPlugin = createSideToolbarPlugin({
    theme: { buttonStyles, toolbarStyles, blockTypeSelectStyles },
    structure: [
        DefaultBlockTypeSelect
    ]
});



const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
        HeadlinesButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton
    ]
});






const { InlineToolbar } = inlineToolbarPlugin;
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin,sideToolbarPlugin];
const text = 'Once you click into the text field the sidebar plugin will show up …';


export default class MyDraftEditor extends Component {

    state = {
        editorState: createEditorStateWithText(text),
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        return (
            <div className={editorStyles.editor} onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element) => { this.editor = element; }}
                />
                <SideToolbar />
                <InlineToolbar />
            </div>
        );
    }
}