import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import { reduxForm } from 'redux-form';
import styles from '../shared/styles.scss';

const inlineStyles = {
  submitButton: { marginLeft: 12 }
};


class Link extends Component {

  constructor(props) {
    super(...props);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ sourceURL: props.sourceURL, sourceTitle: props.sourceTitle });
  }

  render() {
    const { handleSubmit, submitting, fields: { sourceURL, sourceTitle } } = this.props;
    return (
      <div className={styles.root}>
        <TextField
          className={styles.inputText}
          {...sourceURL}
          floatingLabelText="SourceURL"
          hintText='Enter the sourceURL'
          fullWidth={true}
          errorText={sourceURL.touched && sourceURL.error ? sourceURL.error : ''}
        />
        <TextField
          className={styles.inputText}
          {...sourceTitle}
          floatingLabelText="SourceTitle"
          hintText='Enter the sourceTitle'
          fullWidth={true}
          errorText={sourceTitle.touched && sourceTitle.error ? sourceTitle.error : ''}
        />
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
            label="Save"
            labelPosition="after"
            icon={<ContentAddCircle />}
            disabled={submitting}
            style={inlineStyles.submitButton}
            onClick={handleSubmit(this.handleUpdateItem)}
          />
        </div>
      </div>
    );
  }
}

Link.propTypes = {
  targetType: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

function validate(values) {
  const errors = {};
  if (!values.sourceTitle) {
    errors.sourceTitle = 'Enter sourceTitle'
  }

  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(values.sourceURL)) {
    errors.sourceURL = 'URL is not valid'
  }

  return errors;
}


export default reduxForm({
  form: 'ItemFormLink',
  fields: ['sourceURL', 'sourceTitle'],
  validate
})(Link);
