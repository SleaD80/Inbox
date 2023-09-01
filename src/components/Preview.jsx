import { useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import expandIcon from '../assets/arrows-angle-expand.svg';
import contractIcon from '../assets/arrows-angle-contract.svg';

function Preview(props) {
  //const docs = [{ uri: props.content }];
  const docs = props.content.map((item) => {
    return { uri: item };
  });
  const [activeDocument, setActiveDocument] = useState(docs[0]);

  const handleDocumentChange = (document) => {
    setActiveDocument(document);
  };
  return props.content ? (
    <>
      <div style={{ textAlign: 'right' }}>
        <button
          type="button"
          className="btn rounded-circle"
          style={{
            width: '35px',
            height: '35px',
            marginRight: '10px',
            boxShadow: '1px 1px grey',
          }}
          onClick={props.togglePreview()}
        >
          <img src={props.status ? contractIcon : expandIcon} alt=""></img>
        </button>
      </div>
      <DocViewer
        documents={docs}
        activeDocument={activeDocument}
        pluginRenderers={DocViewerRenderers}
        onDocumentChange={handleDocumentChange}
        //theme={{
        //primary: 'white',
        //secondary: '#ffffff',
        //tertiary: 'white',
        //textPrimary: '#ffffff',
        //textSecondary: '#5296d8',
        //textTertiary: '#00000099',
        //disableThemeScrollbar: false,
        //}}
        config={{
          header: {
            disableHeader: false,
            disableFileName: true,
            retainURLParams: false,
          },
        }}
      />
    </>
  ) : (
    <div>Файл не найден</div>
  );
}

export default Preview;
