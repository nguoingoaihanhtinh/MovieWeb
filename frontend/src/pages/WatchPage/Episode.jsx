import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

const Episode = ({movieDetails}) => {
    console.log('ep',movieDetails)
    return (
        <div className='mt-5'>
            {(
                movieDetails?.data?.item?.episodes?.[0]?.server_data?.length > 0 ? (
                  <div className="">
                    <div className="w-1/5 flex gap-5 bg-gray-800 px-5 py-2 items-center text-center"><FaBars/><span className="font-semibold text-yellow-600">{movieDetails.data.item.episodes[0].server_name}</span></div>
                    <div className="flex flex-wrap gap-2  p-5 bg-gray-800">
                      {movieDetails.data.item.episodes[0].server_data.map((episode) => (
                        <button
                          key={episode.slug}
                          onClick={() =>
                            navigate(`/watch/${movieDetails.data.item.slug}/episode/${episode.slug}`)
                          }
                          className="bg-gray-600 hover:bg-gray-500 text-white rounded px-4 py-2 text-sm"
                        >
                          {episode.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>No episodes available.</div>
                )
              )}
        </div>
    )
    }

export default Episode