#!/usr/bin/python
#from datetime import datetime
from mx.DateTime import *

#Parse Info
APPLICATION_ID = "VvUJBMqX0f8khK4gl4FOzVX9VsI9xcSCESTTm41M"
REST_API_KEY = "AAyF9pCtpd5zbfabJa8aZlWMv61hjHisLC9RBsOS"
#Parse dependencies
from parse_rest.connection import register
# Alias the Object type to make clear is not a normal python Object
from parse_rest.datatypes import Object
#first register the app
register(APPLICATION_ID, REST_API_KEY)

#Youtube API dependencies
from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser


# Set DEVELOPER_KEY to the API key value
DEVELOPER_KEY = "AIzaSyAxj_QrI5vh1VR5zlCk6Cvt0iIeNiggozY"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

#---------------------------------------------------------------------------------

def youtube_search():
  youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    developerKey=DEVELOPER_KEY)

  # Call the search.list method to retrieve results matching the specified
  # query term.
  search_response = youtube.search().list(
    type="video",
    channelId="UC_ubODQ5JFTxruxU2Yvo1Zw",
    publishedAfter="2015-04-01T00:00:00Z",
    publishedBefore="2015-12-30T00:00:00Z",
    part="id,snippet",
    maxResults=20
  ).execute()

#---------------------------------------------------------------------------------

  search_videos = []

  # Merge video ids
  for search_result in search_response.get("items", []):
    search_videos.append(search_result["id"]["videoId"])
  video_ids = ",".join(search_videos)

  # Call the videos.list method to retrieve location details for each video.
  video_response = youtube.videos().list(
    id=video_ids,
    part='snippet, recordingDetails, player'
  ).execute()

#---------------------------------------------------------------------------------

  videos = []

  # Add each result to the list, and then display the list of matching videos.
  for video_result in video_response.get("items", []):
    videos.append("%s, (%s,%s,%s)" % (video_result["snippet"]["title"],
                              video_result["snippet"]["publishedAt"],
                              video_result["player"]["embedHtml"],
                              video_result["snippet"]["thumbnails"]["default"]["url"]))

    myTitle = video_result["snippet"]["title"]
    myPublishedAt = video_result["snippet"]["publishedAt"]
    myEmbedLink = video_result["player"]["embedHtml"]
    myThumbnail = video_result["snippet"]["thumbnails"]["default"]["url"]
    print myTitle
    print myPublishedAt
    print myEmbedLink
    print myThumbnail

  #--------------------------------------------------------
    #define a Python class that inherts from parse_rest.datatypes.Object
    class videoListClass2(Object):
        pass

    #creating Object subclass by string name
    objectName = "nextString"
    myObject = Object.factory(objectName)

    #instantiate new class with some parameters
    newRow = videoListClass2(refTitle = myTitle, refPublishedAt = myPublishedAt, refThumbnail = myThumbnail, refTag = "no tag yet", alreadyTagged = False) 

    #save our new object, by calling the save() method
    newRow.save()

    #print "Videos:\n", "\n".join(videos), "\n"
    #print "This is it: ", videos[2]

#---------------------------------------------------------------------------------
  d = now()
  t =  now() + RelativeDateTime(minutes=-180)
  print "Now: ", d
  print "10mins ago: ", t

if __name__ == "__main__":
  try:
    youtube_search()
  except HttpError, e:
    print "An HTTP error %d occurred:\n%s" % (e.resp.status, e.content)
