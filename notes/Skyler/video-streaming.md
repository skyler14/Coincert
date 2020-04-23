## Video streaming basics
Videos are generally streamed in a way such that the initial connection to request download is encrypted (e.g. https  request) but the blobs themselves are sent via an unencrypted protocol (e.g.: http). The blobs are either encrypted or the drm is built into the blobs and the rendering application can unpack the video to display. The other option is to allow the blob to be completely unencrypted but that means any intermediary gets to download the source. The reason that you don't send the blobs in https is that is not cached on the intermediary servers, CDNs, or any proxy caches and that can severely effect performance. 

### Process
1. encrypted authentication to send user credentials via https
2. streamer encrypts blobs as they transcode it
3. sends blob via http
4. rendering engine unencrypts blob
5. renderer plays file

### Security options

#### Https referer
When querying a resource (e.g. a video), the HTTP request header can include a field "referrer" (who sent you to me). It is often discarded, or used for analytics but it also an easy way of preventing the download of the video from another session, unauthorized access, etc. even though you can see it in the web player. 

#### Metamask
If the users wallet is verfied by metamask that can be used to generate the session, and metamask can perform the check(?)
