import {useReducer, useCallback} from 'react';


const paginatorReducer = (state, action) => {
    switch(action.type){
        case 'MOVE_TO_NEXT':
            const newCurrentPage = state.currentPage + 1;
            return {...state, currentPage: newCurrentPage <= state.countOfPage ? newCurrentPage : state.currentPage};
        case 'CHANGE_PAGE':
            return {...state, currentPage: action.page};
        case 'MOVE_TO_PREV': {
            const newCurrentPage = state.currentPage - 1;
            return {...state, currentPage: newCurrentPage > 0 ? newCurrentPage : state.currentPage};
        }
        case 'TOTAL_ELEMENTS_CHANGE':
            const newCountOfPage = Math.ceil(action.totalElements/state.elementPerPage);
            const currentPage = state.currentPage > newCountOfPage ? state.currentPage - 1 : state.currentPage;
            return {...state, currentPage, totalElements: action.totalElements, countOfPage: newCountOfPage};
        default:
            return {...state};
    }
}


export const usePaginator = (initValues) => {
    const [paginatorState, dispatch] = useReducer(paginatorReducer ,{
        totalElements: 0,
        elementPerPage: initValues.elementPerPage,
        currentPage: 1,
        countOfPage: 0
    });

    const nextPageHandler = useCallback(() => {
        dispatch({type: 'MOVE_TO_NEXT' });
    },[]);

    const changePageHandler = useCallback((page) => {
        dispatch({type: 'CHANGE_PAGE', page});
    },[]);

    const prevPageHandler = useCallback(() => {
        dispatch({type: 'MOVE_TO_PREV'});
    },[]);

    const changeTotalElementsHandler = useCallback((totalElements) => {
        dispatch({type: 'TOTAL_ELEMENTS_CHANGE', totalElements});
    }, [])

    return [nextPageHandler, changePageHandler, prevPageHandler, changeTotalElementsHandler, paginatorState];
}