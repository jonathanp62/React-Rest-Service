{/*
  * (#)App.jsx 0.3.0   01/20/2024
  * (#)App.jsx 0.2.0   01/19/2024
  * (#)App.jsx 0.1.0   01/19/2024
  *
  * @author  Jonathan Parker
  * @version 0.3.0
  * @since   0.1.0
  *
  * MIT License
  *
  * Copyright (c) 2024 Jonathan M. Parker
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  */}

import {Footer} from "./Footer.jsx";
import {Header} from "./Header.jsx";
import {Posts} from "./Posts.jsx";

import packageJson from "../package.json";

export default function App() {
    return (
        <>
            <Header title={packageJson.appConfig.title} />
            <Posts
                getUrl={packageJson.appConfig.postsGetUrl}
                postUrl={packageJson.appConfig.postsPostUrl}
                deleteUrl={packageJson.appConfig.postsDeleteUrl}
            />
            <Footer
                title={packageJson.appConfig.title}
                version={packageJson.version}
            />
        </>
    );
}
