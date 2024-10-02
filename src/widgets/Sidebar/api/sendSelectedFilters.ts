export const sendSelectedFilters = async (selectedFilters: {
  [key: string]: number[]
}) => {
  try {
    console.log(selectedFilters, 222)
    //const a = selectedFilters.artTypes.length < 0
    //encodeURIComponent(selectedFilters)

    // const response = await fetch('/api/filters', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(selectedFilters),
    // })
    const response = {
      ok: true,
    }
    response

    if (!response.ok) {
      throw new Error('Failed to send selected filters')
    }

    const data = await response
    // const data = await response.json()
    return data
  } catch (error) {
    console.error('Error sending selected filters:', error)
    throw error
  }
}
