"use client"

import { useState, useEffect } from "react"

export function GoogleMap() {

  useEffect(() => {
  }, [])

  return (
    <div className="h-[500px] w-full">
      {/* Google Map iframe with the provided URL that includes a marker */}
      <iframe
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAbMq2GbvKt0koOmW7IqzJntqghocwlGw8&q=Northwest+Motors+Inc,2459 S IL Route 83,Mundelein+IL+60060"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}
