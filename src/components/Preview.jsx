import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import expandIcon from '../assets/arrows-angle-expand.svg';
import contractIcon from '../assets/arrows-angle-contract.svg';

function Preview(props) {
  const docs = props.content
    ? props.content.map((item) => {
        return { uri: item };
      })
    : [];
  return (props.content && props.content.length) > 0 ? (
    <>
      <div style={{ textAlign: 'right' }}>
        <img
          src={props.status ? contractIcon : expandIcon}
          alt=""
          onClick={props.togglePreview()}
          style={{ transform: 'translate(-15px, 0px)' }}
        ></img>
      </div>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        theme={{
          primary: 'white',
          //secondary: '#ffffff',
          tertiary: 'white',
          //textPrimary: '#ffffff',
          //textSecondary: '#5296d8',
          //textTertiary: '#00000099',
          disableThemeScrollbar: false,
        }}
        config={{
          header: {
            disableHeader: docs.length === 1,
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
