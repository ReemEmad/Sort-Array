export const decodeJSON = (contents) => {
  return JSON.parse(
    //eslint-disable-next-line
    contents
      .replace(/\[\\\"/g, '["')
      .replace(/\\\"\]/g, '"]')
      .replace(/{\\\"/g, '{"')
      .replace(/\\\":/g, '":')
      .replace(/:\\\"/g, ':"')
      .replace(/\\"}/g, '"}')
      .replace(/,\\"/g, ',"')
      .replace(/\\",/g, '",')
      .replace(/\\\\/g, "\\")
      .replace(/\\\\\"/g, '\\"'),
  )
}
