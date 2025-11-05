class FormData {
  constructor() {
    this.boundary = `----FormDataBoundary${Date.now()}`;
    this.parts = [];
  }

  append(key, value) {
    const part = [
      `--${this.boundary}`,
      `Content-Disposition: form-data; name="${key}"`,
      `Content-Type: text/plain; charset=UTF-8`,
      ``,
      value
    ];
    this.parts.push(part.join('\r\n'));
  }

  appendFile(key, filePath) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath,
        encoding: 'binary',
        success: (res) => {
          const fileName = filePath.split('/').pop();
          const part = [
            `--${this.boundary}`,
            `Content-Disposition: form-data; name="${key}"; filename="${fileName}"`,
            `Content-Type: application/octet-stream`,
            ``,
            res.data
          ];
          this.parts.push(part.join('\r\n'));
          resolve();
        },
        fail: reject
      });
    });
  }

  getHeaders() {
    return {
      'Content-Type': `multipart/form-data; boundary=${this.boundary}`
    };
  }

  getBuffer() {
    const footer = `--${this.boundary}--`;
    const joined = this.parts.join('\r\n') + '\r\n' + footer;
    const buffer = new Uint8Array(joined.length);
    for (let i = 0; i < joined.length; i++) {
      buffer[i] = joined.charCodeAt(i);
    }
    return buffer;
  }
}
wx.FormData = FormData;