import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function Preview({ content }) {
  const docs = [{ uri: content }];
  return content ? (
    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
  ) : (
    <div>Файл не найден</div>
  );
}

export default Preview;
