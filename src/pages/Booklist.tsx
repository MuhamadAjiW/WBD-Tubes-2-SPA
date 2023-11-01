import React from 'react';

const BookList = () => {
    return (
        <div className="bookpage">
            <header>
                <h1>Books Management</h1>
                <p>Create, update, delete or listen to your books here!</p>
            </header>
            <div className="booktable">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Word Count</th>
                            <th>Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default BookList;