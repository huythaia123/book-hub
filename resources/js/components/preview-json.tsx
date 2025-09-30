export default function PreviewJson({ json }: { json: object }) {
    return (
        <pre className='mt-2 rounded-md border p-4'>
            <code>{JSON.stringify(json, null, 2)}</code>
        </pre>
    );
}
