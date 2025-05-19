// components/common/FileDropZone.tsx
'use client';

import { InboxOutlined } from '@ant-design/icons';
import { Upload, message, Button } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload';
import React from 'react';

const { Dragger } = Upload;

export interface FileDropZoneProps
  extends Omit<UploadProps, 'onChange' | 'beforeUpload' | 'multiple'> {
  action: string;
  maxFiles?: number;
  maxSizeMB?: number;
  onUploaded?: (files: UploadFile[]) => void;
  /** Optional big icon shown in the centre */
  icon?: React.ReactNode;
}

export default function FileDropZone({
  action,
  accept,
  maxFiles = Infinity,
  maxSizeMB = Infinity,
  onUploaded,
  icon,
  ...rest
}: FileDropZoneProps) {
  const sizeLimit = maxSizeMB * 1024 * 1024;

  const beforeUpload: UploadProps['beforeUpload'] = (file, fileList) => {
    if (fileList.length > maxFiles) {
      message.error(`You can only upload up to ${maxFiles} file(s).`);
      return Upload.LIST_IGNORE;
    }
    if (file.size > sizeLimit) {
      message.error(`${file.name} exceeds the ${maxSizeMB} MB limit.`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const onChange: UploadProps['onChange'] = info => {
    const { status, name } = info.file;
    if (status === 'done') message.success(`${name} uploaded successfully`);
    if (status === 'error') message.error(`${name} upload failed`);

    const allDone = info.fileList.every(f =>
      ['done', 'error', 'removed'].includes(f.status!),
    );
    if (allDone && onUploaded) onUploaded(info.fileList);
  };

  return (
    <Dragger
      name="file"
      action={action}
      accept={accept}
      multiple={maxFiles !== 1}
      beforeUpload={beforeUpload}
      onChange={onChange}
      {...rest}
    >
      <p className="ant-upload-drag-icon">
        {icon ?? <InboxOutlined />}        {/* ← configurable */}
      </p>
      <p className="ant-upload-text">
        Click or drag file(s) here to upload
      </p>
      <p className="ant-upload-hint text-sm">
        {(maxFiles !== Infinity || maxSizeMB !== Infinity) && (
          <>
            {maxFiles !== Infinity && `Max ${maxFiles} files. `}
            {maxSizeMB !== Infinity && `Up to ${maxSizeMB} MB each.`}
          </>
        )}
      </p>
    </Dragger>
  );
}
