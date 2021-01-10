import React, { useState } from 'react';
import { Typography, Button, Form, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';

const { TextArea } = Input
const { Title } = Typography;


const PrivateOption = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' },
];

const CategoryOption = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Autos & Vehicles' },
    { value: 2, label: 'Music' },
    { value: 3, label: 'Pets & Animals' },
    { value: 4, label: 'Sports' },
];


function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Private, setPrivate] = useState(0); // 1
    const [Category, setCategory] = useState('Film & Animation');

    const handleChangeTitle = (event) => {
        setVideoTitle(event.currentTarget.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.currentTarget.value);
    };

    const handleChangePrivate = (event) => {
        setPrivate(event.currentTarget.value);
    };

    const handleChangesetCategory = (event) => {
        setCategory(event.currentTarget.value);
    };


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} style={{ textAlign: 'center' }}>
                    {/* <PlayCircleOutlined /> */}
                 &nbsp; Upload Video
                </Title>
            </div>
            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/*Dropzone */}
                    <Dropzone
                        onDrop
                        multiple
                        maxSize>
                        {({ getRootProps, getInputProps }) => (
                            <div
                                style={{
                                    width: '300px',
                                    height: '240px',
                                    border: '1px solid lightgray',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>
                    {/*Thumbnail */}
                    <div>
                        <img src alt />
                    </div>
                </div>

                <br /> <br />
                <label>Title</label>
                <Input onChange={handleChangeTitle} value={VideoTitle} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={handleChangeDescription} value={Description} />
                <br />
                <br />
                <select onChang={handleChangePrivate}>
                    {PrivateOption.map((item, index) => (
                        <option key={index} value={item.label}>
                            {item.label}
                        </option>
                    ))}
                    <option key value></option>
                </select>
                <br />
                <br />
                <select onChang={handleChangesetCategory}>
                    {CategoryOption.map((item, index) => (
                        <option key={index} value={item.label}>
                            {item.label}
                        </option>
                    ))}
                    <option key value></option>
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage