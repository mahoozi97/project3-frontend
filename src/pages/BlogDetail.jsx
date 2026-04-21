import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlogById, addComment, deleteComment } from '../services/blogService'