import React from 'react'
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { twj } from 'tw-to-css';


export default function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    console.log('KEYWORD:', keyword)

    return (
        pages > 1 && (
            <Pagination style={twj("align-items-center mx-auto")}>
                {
                    [...Array(pages).keys()].map((x) => (
                        <LinkContainer
                            key={ x + 1 }
                            to={
                                !isAdmin ?
                                {
                                    pathname: "/", 
                                    search: `keyword=${keyword}&page=${ x + 1 }`
                                } : {
                                    pathname: "/admin/productlist/", 
                                    search: `keyword=${keyword}&page=${ x + 1 }`
                                }
                            }
                        >
                            <Pagination.Item active={ x + 1 === page }>
                                { x + 1 }
                            </Pagination.Item>
                        </LinkContainer>
                    ))
                }
            </Pagination>
        )
    )
}
