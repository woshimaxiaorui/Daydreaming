import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { IAddScriptResponse, IScriptTable } from '@/pages/types/scriptManagement';
import { connect } from 'react-redux'
import { Dispatch } from '@/models/connect';
import _ from 'lodash';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

interface IProps {
  visible: boolean;
  currentEditData: IScriptTable;
  dispatch: Dispatch;
  onContentShow(visible: boolean): void;
}

interface IState {
  contentHtml: any;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class ContentScriptModel extends React.Component<IProps, IState> {
  state = {
    contentHtml: EditorState.createEmpty(),
  };

  onEditorStateChange = (contentHtml: any) => {
    this.setState({
      contentHtml,
    });
  };

  onSubmit = async (values: any) => {
    let editorContent = draftToHtml(convertToRaw(this.state.contentHtml.getCurrentContent()));

    console.log('contentHtml1111=>',this.state.contentHtml.getCurrentContent());
    console.log('contentHtml2222=>',editorContent);
    return;
    const params = {
      scriptId: values.id,
      scriptContent: editorContent
    };
    const submitRes: IAddScriptResponse = await this.props.dispatch({
      type: 'scriptManagement/editScriptManagementEffect',
      params
    });
    this.props.onContentShow(false);
  };

  render() {
    const initialValues = { ...this.props.currentEditData };
    return (
      <Modal
        title="修改剧本内容详情"
        centered={true}
        width="90%"
        visible={this.props.visible}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <Form {...layout} name="scriptAddForm" onFinish={this.onSubmit}
              initialValues={ initialValues }
        >
          <Form.Item
            name="id"
            label="ID"
            hidden
          />
          <Editor
            editorState={this.state.contentHtml}
            onEditorStateChange={this.onEditorStateChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            localization={{
              locale: 'zh',
            }}
          />
          <div className="add-script-submit-button-area">
            <Button
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
            <Button className="cancel" onClick={() => this.props.onContentShow(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
export default connect()(ContentScriptModel);
