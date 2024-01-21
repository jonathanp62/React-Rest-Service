{/*
  * (#)Posts.jsx   0.3.0   01/20/2024
  * (#)Posts.jsx   0.2.0   01/19/2024
  *
  * @author  Jonathan Parker
  * @version 0.3.0
  * @since   0.2.0
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

import {useEffect, useState} from "react";

import PropTypes from 'prop-types';

export function Posts(props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts()
            .finally();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(props.getUrl);
            const posts = await response.json();

            setPosts(posts);
        } catch (error) {
            console.log(error);
        }
    }

    const addPost = async (title, body) => {
        try {
            const response = await fetch(props.postUrl, {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: Math.random().toString(36).slice(2),
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const data = await response.json();

            setPosts((posts) => [data, ...posts]);
            setTitle('');
            setBody('');
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async (id) => {
        const url = `${props.deleteUrl}/${id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });

            if (response.status === 200) {
                setPosts(
                    posts.filter(post => {
                        return post.id !== id;
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addPost(title, body)
            .finally();
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                    <textarea name=""
                              id=""
                              cols="10"
                              rows="8"
                              value={body}
                              onChange={e => setBody(e.target.value)}
                    />
                    <button type="submit">Add Post</button>
                </form>
            </div>
            <div>
                {posts.map(post => {
                    return (
                        <div key={post.id}>
                            <hr />
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <div>
                                <button
                                    onClick={() => deletePost(post.id)}
                                >
                                Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Posts.propTypes = {
    getUrl: PropTypes.string.isRequired,
    postUrl: PropTypes.string.isRequired,
    deleteUrl: PropTypes.string.isRequired,
};