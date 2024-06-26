import { Footer } from "flowbite-react";
import {Link} from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from "react-icons/bs";

export default function FooterCom(){ 
    return(
        // <Footer container className="border border-t-8 border-teal-500 h-60">
        <Footer container className="border border-t-6 h-60 dark:bg-black">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">

                    <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                    <span className='px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg  text-white'>MERNify</span>
                    </Link>
                    </div>

                    <div className="grid  grid-cols-2 gap-3 sm: mt-4 sm:grid-cols-2 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                href="https://github.com/zebakatarki"
                                target="blank"
                                rel="noopener noreferrer">
                                    Github
                                </Footer.Link>
                                
                                <Footer.Link
                                href="https://www.linkedin.com/in/zebakatarki98"
                                target="blank"
                                rel="noopener noreferrer">
                                    LinkedIn
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                href="#"
                                target="blank"
                                rel="noopener noreferrer">
                                    Privacy Policy
                                </Footer.Link>
                                
                                <Footer.Link
                                href="#"
                                target="blank"
                                rel="noopener noreferrer">
                                    Terms & Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="MERNify" year={new Date().getFullYear()}/>

                    <div className="flex gap-6 sm:mt-0  mt-4 sm:justify-center dark:to-black">
                        <Footer.Icon href="#" icon={BsFacebook}/>
                        <Footer.Icon href="#" icon={BsInstagram}/>
                        {/* <Footer.Icon href="#" icon={BsTwitter}/> */}
                        <Footer.Icon href="#" icon={BsGithub}/>
                        {/* <Footer.Icon href="#" icon={BsDribbble}/> */}
                    </div>
                </div>
            </div>
        </Footer>
    )
}