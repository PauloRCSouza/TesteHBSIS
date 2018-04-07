import * as React from 'react';
//import * as Modal from 'react-modal';
import { CreateUpdate } from '../Book/CreateUpdate'
import { RouteComponentProps } from 'react-router';
import * as Book from '../Book/model/book';

interface BookFormState {
    book: Book.Book;
}

export class BookForm extends React.Component<RouteComponentProps<{}>, BookFormState>{

    //#region Constructor

    constructor(props: any) {
        super(props);
        
    };

    //#endregion Constructor

    
    //#region Render

    public render() {

        return <div>
            <h1> Livro </h1>
            
        </div>;
    }

    
    
    //#endregion


    //#region Handlers
    
    //#endregion

}

