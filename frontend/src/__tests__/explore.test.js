import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import Explore from '../explore/App';
jest.setTimeout(20000)
const fakeData = [
    {
        "userData": {
            "username": "asdf123",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "andrdev0001@gmail.com"
        },
        "userPosts": null
    },
    {
        "userData": {
            "username": "vivianakadivine",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "divine@gullygang.in"
        },
        "userPosts": [
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fdivine%40gullygang.in1690815707644?alt=media&token=dea2bf01-bf28-4a7a-a623-4b25896c3260",
                "like": "4",
                "comments": [
                    {
                        "comment": "nice",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "nice amine must watch",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "yp",
                        "currentUser": "demo2@Insta.com"
                    },
                    {
                        "comment": "yoo anime",
                        "currentUser": "bhavik@gmail.com"
                    },
                    {
                        "comment": "lets go",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "ye",
                        "currentUser": "pushkarm029@gmail.com"
                    }
                ],
                "caption": "Demon Slayer Lets go"
            },
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fdivine%40gullygang.in1690622295651?alt=media&token=39f5c8b7-c0b4-41af-aa32-eb0280de2047",
                "like": "1",
                "comments": [
                    {
                        "comment": "okk",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "vgvgjj",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "checking comment section",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "lol",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "checking bro",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "yee",
                        "currentUser": "pushkarm029@gmail.com"
                    }
                ],
                "caption": "logo"
            },
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fdivine%40gullygang.in1692603565885?alt=media&token=3638b16b-3075-4ed3-882e-c79ec257fac5",
                "like": "1",
                "comments": null,
                "caption": "demo post"
            },
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fdivine%40gullygang.in1690608852013?alt=media&token=b2467173-6659-49ad-9fcb-e7f5a0bd37e5",
                "like": "2",
                "comments": [
                    {
                        "comment": "yo",
                        "currentUser": "divine@gullygang.in"
                    }
                ],
                "caption": "Logo Yay!"
            }
        ]
    },
    {
        "userData": {
            "username": "kvunal",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "kvunal029@gmail.com"
        },
        "userPosts": [
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fkvunal029%40gmail.com1691660728800?alt=media&token=727cbcad-9ef5-4236-b92c-26ba3e6f05a6",
                "like": "1",
                "comments": [
                    {
                        "comment": "bhai bhai",
                        "currentUser": "kd@gmail.com"
                    }
                ],
                "caption": "yo what is up?"
            }
        ]
    },
    {
        "userData": {
            "username": "kd",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "kd@gmail.com"
        },
        "userPosts": [
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fkd%40gmail.com1691989752541?alt=media&token=0c58dbdb-61db-4d13-9fe1-0937727443e1",
                "like": "2",
                "comments": [
                    {
                        "comment": "niceeee",
                        "currentUser": "kd@gmail.com"
                    }
                ],
                "caption": "ball ball khel rha"
            }
        ]
    },
    {
        "userData": {
            "username": "test",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "test@insta.in"
        },
        "userPosts": null
    },
    {
        "userData": {
            "username": "demo029",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "demo@insta.com"
        },
        "userPosts": null
    },
    {
        "userData": {
            "username": "bhalu",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "bhalu@gmail.com"
        },
        "userPosts": [
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fbhalu%40gmail.com1691838039979?alt=media&token=ac5d7a8e-0e52-4b81-a6b2-86bf403d6549",
                "like": "0",
                "comments": [
                    {
                        "comment": "bhalu",
                        "currentUser": "pushkarm029@gmail.com"
                    }
                ],
                "caption": "lets go"
            }
        ]
    },
    {
        "userData": {
            "username": "bhavikgupta",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "bhavik@gmail.com"
        },
        "userPosts": [
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fbhavik%40gmail.com1691685002250?alt=media&token=be29c7e2-8bf8-4010-abcc-8a6f06d96d4b",
                "like": "1",
                "comments": [
                    {
                        "comment": "yo",
                        "currentUser": "pushkarm029@gmail.com"
                    },
                    {
                        "comment": "nice place",
                        "currentUser": "divine@gullygang.in"
                    }
                ],
                "caption": "ayoo taj mahal ghum rha"
            }
        ]
    },
    {
        "userData": {
            "username": "techstark",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "asifpeerzade6@gmail.com"
        },
        "userPosts": null
    },
    {
        "userData": {
            "username": "demouser029",
            "name": "",
            "followersList": null,
            "followingList": null,
            "bio": "",
            "link": "",
            "profile_image_link": "",
            "email": "demo2@Insta.com"
        },
        "userPosts": [
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fdemo2%40Insta.com1691992956160?alt=media&token=b6f6c394-4198-4d03-a76f-04afe5cdf524",
                "like": "0",
                "comments": [
                    {
                        "comment": "lol",
                        "currentUser": "pushkarm029@gmail.com"
                    }
                ],
                "caption": "golang"
            },
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fdemo2%40Insta.com1690876973715?alt=media&token=2925edf5-b287-4050-a806-29bdc5fd8c09",
                "like": "2",
                "comments": [
                    {
                        "comment": "nice post",
                        "currentUser": "demo2@Insta.com"
                    },
                    {
                        "comment": "less go",
                        "currentUser": "demo2@Insta.com"
                    }
                ],
                "caption": "first post"
            },
            {
                "image_link": "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/images%2Fdemo2%40Insta.com1691992946471?alt=media&token=548717b6-01b8-4168-aa2d-2be2951356ad",
                "like": "0",
                "comments": null,
                "caption": "golang"
            }
        ]
    }
];

const filteredData = fakeData.filter(item => item.userPosts !== null && Array.isArray(item.userPosts) && item.userPosts.length > 0);

describe('Explore', () => {
    it('renders images with correct src', async () => {
        fetchMock.mock('/api/explore/posts', () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        status: 200,
                        body: filteredData,
                    });
                }, 5000);
            });
        });

        render(<Explore />);
        const imgElements = document.querySelectorAll('.exploreImages img');
        await waitForElementToBeRemoved(() => screen.getByText('Loading Bro......'), { timeout: 10000 }); // Wait for up to 10 seconds
        imgElements.forEach((img, index) => {
            expect(img).toHaveAttribute('src', fakeData[index].userPosts[0].image_link);
        });
    });
});
