import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText,composeDecorators } from 'draft-js-plugins-editor';
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
import 'draft-js-image-plugin/lib/plugin.css';
import editorStyles from './editorStyles.css';
import buttonStyles from './buttonStyles.css';
import toolbarStyles from './toolbarStyles.css';
import fontstyle from "font-awesome/css/font-awesome.min.css";
import blockTypeSelectStyles from './blockTypeSelectStyles.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import styled from  "styled-components";
import BlockTypeSelect  from  "draft-js-side-toolbar-plugin/lib/components/BlockTypeSelect";

import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });



class ImageAddButton extends Component {
    toggleStyle = (event) => {
        console.log("fffffff");
        event.preventDefault();
        this.props.setEditorState(
            RichUtils.toggleInlineStyle(
                this.props.getEditorState(),
                "BOLD"
            )
        );
    }
    preventBubblingUp = (event) => { event.preventDefault(); }
    handleFiles= (event) => {
        var {setEditorState,getEditorState}=this.props;
        console.log(event.target.files);
        console.log("getEditorState",this.props.getEditorState());
        var url=URL.createObjectURL(event.target.files[0]);//"http://q.qlogo.cn/qqapp/1105090818/26C3F72CB0E08B7E397821CAA5A90753/100"
        setEditorState(imagePlugin.addImage(this.props.getEditorState(),url,""));
    }
    createImage()
    {
        console.log("sayHello");
    }
    render() {
        console.log("props",this.props);
        return (
            <div className={editorStyles.headlineButtonWrapper} onMouseDown={this.preventBubblingUp}>
                <input type="file" id="fileElem" style={{display:"none"}} onChange={this.handleFiles} />
                <label  className="fa fa-image" htmlFor="fileElem" >X
                </label>
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
            ImageAddButton
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
        ImageAddButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton
    ]
});


const { InlineToolbar } = inlineToolbarPlugin;
const { SideToolbar } = sideToolbarPlugin;
const plugins = [
    inlineToolbarPlugin,
    sideToolbarPlugin,
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin
];


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
                <AlignmentTool />
                <SideToolbar />
                <InlineToolbar />
                <div style={{background:"#778899"}}>
                    <ImageAddButton />
                </div>

            </div>
        );
    }
}