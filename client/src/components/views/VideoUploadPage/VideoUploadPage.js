import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Typography, Form, Input, Icon } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
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
  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
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

  const onDrop = (files) => {

    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    console.log(files)
    formData.append("file", files[0])

    axios.post('/api/video/uploadfiles', formData, config)
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
        } else {
          alert('failed to save the video in server')
        }
      })
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          <PlayCircleOutlined />
          &nbsp; Upload Video
        </Title>
      </div>
      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}>
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
        </div>
      </Form>
      <br /> <br />
      <label>Title</label>
      <Input onChange={handleChangeTitle} value={VideoTitle} />
      <br />
      <br />
      <label>Description</label>
      <TextArea onChange={handleChangeDescription} value={Description} />
      <br />
      <br />
      <select onChange={handleChangePrivate}>
        {PrivateOptions.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <br />
      <br />
      <select onChange={handleChangesetCategory}>
        {CategoryOption.map((item, index) => (
          <option key={index} value={item.label}>
            {item.label}
          </option>
        ))}
      </select>
      <br />
      <br />
    </div>
  );
}

export default VideoUploadPage;
