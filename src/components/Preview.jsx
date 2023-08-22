import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function Preview({ content }) {
    const docs = [{ uri: content }];

    return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}

export default Preview;
