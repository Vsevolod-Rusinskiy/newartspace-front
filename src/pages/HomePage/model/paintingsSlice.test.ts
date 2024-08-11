import reducer, { fetchPaintingsAction, initialState } from './homePageSlice'
import fetchMock from 'jest-fetch-mock'
import 'dotenv/config'

describe('paintings reducer', () => {
  it('should handle fetchPaintingsAction.fulfilled', () => {
    const mockPaintings = {
      data: [
        {
          id: '1',
          author: 'Vincent van Gogh',
          paintingUrl: 'http://example.com/starry-night.jpg',
          title: 'Starry Night',
          artType: 'Oil on canvas',
          price: 1000000,
          theme: 'Post-Impressionism',
          style: 'Impressionism',
          materials: 'Oil, Canvas',
          height: 73.7,
          width: 92.1,
          yearOfCreation: 1889,
          format: 'Landscape',
          color: 'Blue',
        },
      ],
      total: 1,
    }

    const action = {
      type: fetchPaintingsAction.fulfilled.type,
      payload: mockPaintings,
    }

    const state = reducer(initialState, action)

    expect(state).toEqual({
      paintings: mockPaintings,
      loading: 'succeeded',
      error: null,
    })
  })
})

fetchMock.enableMocks()

describe('fetchPaintingsAction API call', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should call the correct API with the correct parameters', async () => {
    const mockResponse = {
      data: [{ id: '1', title: 'Starry Night' }],
      total: 1,
    }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const dispatch = jest.fn()
    const thunk = fetchPaintingsAction({ page: 1, limit: 10 })

    await thunk(dispatch, () => ({}), undefined)
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/paintings?page=1&limit=10`
    )
  })
})
