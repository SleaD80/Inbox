import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import expandIcon from '../assets/arrows-angle-expand.svg';
import contractIcon from '../assets/arrows-angle-contract.svg';

function Preview(props) {
  const docs = [{ uri: props.content }];
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
        pluginRenderers={DocViewerRenderers}
        theme={{
          primary: 'white',
          secondary: '#ffffff',
          tertiary: 'white',
          textPrimary: '#ffffff',
          textSecondary: '#5296d8',
          textTertiary: '#00000099',
          disableThemeScrollbar: false,
        }}
        config={{
          header: {
            disableHeader: true,
            disableFileName: false,
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
